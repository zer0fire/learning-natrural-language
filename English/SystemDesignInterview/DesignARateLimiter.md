# Some Question

1. What kind of rate limiter are we going to design? client-side or server-side?
2. What kind of throttle API does the rate limiter throttle API requests based on? IP, UserID or other properties?
3. What is the scale of the system? Is it built for a startup or a big company with a large user base?
4. Will the system work in a distributed environment?
5. Is the rate limiter a separate service or should it be implemented in application code?
6. Do we need a inform users who are throttled

# Summary

1. Accurately limit excessive request
2. Low latency, the limiter should not slow down HTTP response time
3. Use as little memory as possible
4. Distributed rate limiting, the limiter can be shared across multiple servers or process
5. Exception handling. Show clear exceptions to users when their requests are throttled
6. High fault tolerance，if there are any problems withe the rate limiter (for example, a cache server goes offline), it does not affect the entire system

# Propose high-level design and get buy-in

1. Where to put the the rate limiter
   - Bucket Solution
   - Fixed window counter
2.
