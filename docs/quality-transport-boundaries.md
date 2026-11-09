# WebSocket transport component boundaries

Standalone BotStrike has two WebSocket hops: client ↔ game host, and game host
↔ private runtime. A Store launch adds the Store's own authenticated socket
proxy ahead of the standalone host. The runtime's own `ws.ping()` observes only
its immediate host peer. The host's outer ping likewise observes its immediate
peer, which can be the Store proxy rather than the browser. Neither observation
alone establishes the entire browser path. Client application ping and Native ACK
observations additionally include browser JavaScript dispatch and runtime work;
neither is one-way network or physical input/display latency.

The standalone BotStrike host explicitly sets `transportQuality: true` in
`game-host.json`. `createGameHost` defaults this option to the strict boolean
configuration value and enables it only on the `botstrike` socket route. Generic
routes and missing/false/non-boolean configuration preserve the earlier proxy
protocol. Store sandbox, origin/account admission and Native inputs are unchanged.

On an opted-in route, the proxy adds the fixed internal handshake header
`X-BotStrike-Transport: host-proxy-v1`. It never copies a browser-supplied value.
The existing runtime token and exact account header remain server-selected.
The marker is a component label, not a secret or human-input attestation; the
runtime must require both its existing authenticated connection and this marker
before trusting the reserved metadata type.

## Outer heartbeat observation

The existing five-second host heartbeat retains its liveness policy and timeout:
an unanswered ping is reclaimed at the following interval. Measurement uses a
fresh random 16-byte payload and a monotonic `performance.now()` send timestamp.
Only a pong equal to the complete current payload produces one RTT observation;
prefixes, concatenations, duplicates, unsolicited pongs and old payloads produce
none. One pending nonce and one previous RTT are held per connection. As before,
any pong marks that peer alive; stronger measurement matching does not silently
change disconnect policy.

The immediate peer's WebSocket stack handles pong. On a direct launch this is
normally the browser network stack; on a Store launch the Store Node proxy can
answer before the browser hop is traversed. Outer RTT includes host send queueing,
immediate-peer handling, return transport and host callback scheduling. The
`gatewayExternal*` names mean external to the runtime hop, not end-to-end browser
RTT. These metrics exclude application JavaScript dispatch as a required step and
does not measure GPU work or physical device latency. Jitter here is precisely
the absolute difference between consecutive matched RTT observations on the same
connection, not a claim about one-way packet jitter or loss.

After a matching pong, and only while both sockets are OPEN, the proxy sends this fixed
object to its private runtime:

```json
{"type":"host_quality","version":1,"rttMs":12.5,"jitterMs":null,"upstreamQueueBytes":0,"downstreamQueueBytes":0}
```

The first matched sample has `jitterMs: null`. Queue gauges are the Node `ws`
objects' `bufferedAmount` values at observation: `upstream` means host → runtime,
and `downstream` means host → browser. They do not include all kernel, TCP or
device buffers. No nonce, account, room, IP address, credential or coordinate is
included. Finite RTT/jitter values over one day or queue values over 1 TiB are
omitted, with one fixed overflow warning per connection; values are never
silently capped into a fabricated exact peak.

For opted-in routes, browser text messages are parsed solely to reject the
reserved `host_quality` type with close code 1008, including Unicode-escaped
JSON keys/values. Otherwise their original raw bytes are forwarded unchanged.
Malformed JSON retains the prior runtime error path. Binary, payload-size,
message-rate, connection-count and backpressure limits remain in force. Routes
without this protocol preserve their existing unknown-command forwarding.

## Validation scope

Run `node --test host/socket-proxy.test.mjs host/server.test.mjs`. Tests open real
HTTP/WebSocket host and runtime-peer sockets with authenticated guest cookies.
They exercise full-nonce matching/replay rejection, exact jitter and fixed schema,
header isolation, enabled-route spoof rejection, default/disabled legacy routes,
unchanged raw Native/client-quality forwarding, malformed text, payload/binary/rate
guards, three-peer cleanup and the actual five-second unanswered-heartbeat timeout.
The runtime peer in these fixtures is a Node WebSocket server, not a Native match
or a physical browser/network acceptance result. Browser/native shaped-network
scenarios and private report ingestion remain separate acceptance evidence.
