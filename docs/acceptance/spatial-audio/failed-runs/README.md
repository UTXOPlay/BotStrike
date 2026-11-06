# Failed or interrupted QA attempts

- `software-renderer-shot-timeout.txt`: original 1.5-second sample wait at DPR 1 timed out. The retained log shows native shots advanced and ARC buffers existed, but does not prove their causal onset within the deadline. A Node condition at five seconds and DPR .5 retains every original combat/weapon/step/impact assertion and passes locally and in the actual image. This is functional QA, not a physical latency result.
- `image-startup-timeout.txt`: one parallel software-renderer image boot exceeded the test's 30-second startup wait. Diagnostics and a 60-second functional startup bound were added; the actual image rerun passed all assertions. Heavy-load real-device startup remains a separate performance gate.
- A standalone offline/real-time audit run was interrupted after four minutes idle in an awaited browser operation. Its harness now records each phase, bounds each operation and uses a real trusted button gesture to resume AudioContext. The diagnostic rerun passed all 12 cases. The interrupted run is not passing evidence.
- The first settings capture found a new slider target smaller than 44 px. Both new sliders were corrected and all six viewport/persistence checks passed.

No failed attempt is counted as a human observation. No passing software-rendered check establishes headphone/speaker quality, physical frame timing or input/audio latency.
