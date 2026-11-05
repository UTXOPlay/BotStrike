# Walk/run review clips

These are six-second, 30 fps fixed-step captures of the candidate, not real-time performance measurements or human playtests. Both repeat idle → walk → run → walk → stop. Capture settings, frozen baseline identity and asset/bundle hashes accompany each video.

- [Vector, side](vector-side.mp4): quiet walking at 167.75 units/s, running at 305 units/s. Tests the fast-walker case that previously entered the run blend too early.
- [Bastion with Kraken, first person](bastion-kraken-first-person.mp4): walking at 94.71 units/s, running at 172.2 units/s. Tests the slow-runner case that previously stayed below the first-person run threshold.

The camera follows the character. The native ground displacement is still integrated from the stated velocity. These clips show the new presentation alone; the existing motion lab can also compare against the immutable original-main implementation.
