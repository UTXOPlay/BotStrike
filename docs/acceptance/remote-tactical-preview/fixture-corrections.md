# Remote staging fixture corrections

These describe operator/fixture setup failures, not passing human observations.
Production and all 38 pre-existing container IDs/images stayed unchanged.

- Before first launch, config parsing found literal newline escapes in generated
  JSON/environment files. They were corrected and parsed; only the two expected
  environment keys and their lengths were checked. No secret values are retained
  here.
- A strict equality check between the workstation and server image IDs failed.
  No launch was accepted from that check. `image-binding.json` records the two
  observed IDs and equality of all 27 ordered rootfs layer digests, runtime
  configuration, OS, architecture and creation metadata. Twenty-four protected
  file hashes were checked independently. Compose pins the verified server ID.
- The internal Docker network did not publish the requested host port. The
  service was healthy inside its container, while a host-loopback health check
  could not connect. The ignored port mapping was removed. Access and the
  passing browser checks use SSH forwarding to the container's actual internal
  address; network isolation is retained.
- `validation/failed-runs/comms-tmpfs-storage.json` retains the initial validation
  rejection: a 256 MiB tmpfs cannot satisfy the service's 2 GiB storage floor.
  The passing fixture puts its disposable recording directory on disk, preserves
  that floor and removes the temporary directory/container after validation.

The running preview has no public route and is not a ten-human cohort. Runtime
WebSocket heartbeat timings cover the host/runtime proxy hop; the independently
recorded application pings cover the client/tunnel/host/service path. Neither
claims physical input or audio latency.
