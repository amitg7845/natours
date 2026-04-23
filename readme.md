# Natours Application

Built using modern technologies: node.js, express, mongoDB, mongoose.
Use npm run debug (For debugging)

Node.js errors are categorized into 3 main types: Programmer Errors, Operational Errors, and System Errors.

1. Programmer Errors (Bugs)
   Internal logic issues - you fix the code:

Type Example Fix
SyntaxError const x = ; Fix syntax
TypeError null.toString() Add null check
ReferenceError console.log(missingVar) Declare variable
RangeError arr[999] Validate bounds 2. Operational Errors (Expected)
External failures - handle gracefully in your app:

text
✅ MongoDB E11000 (duplicate key) - Tour.create()
✅ ENOENT (file not found) - readFileSync()
✅ ValidationError - Mongoose schema
✅ CastError - Invalid ObjectId
✅ 404 - Route not found
javascript
// Your Tour API pattern
try {
await Tour.create(req.body);
} catch (err) {
if (err.code === 11000) { // ← Operational: handle specifically
res.status(400).json({ message: 'Tour name exists' });
}
} 3. System Errors (Fatal)
Infrastructure failures - log + restart:

text
❌ Out of memory (heap limit)
❌ Port in use (EADDRINUSE)
❌ MongoDB connection refused
❌ Disk full
Express Error Pattern (Your Stack)
javascript
app.use((err, req, res, next) => {
// Programmer errors
if (err.name === 'ValidationError' || err.code === 11000) {
return res.status(400).json({ message: err.message });
}

// System errors
console.error(err.stack);
res.status(500).json({ message: 'Internal server error' });
});
Key: Programmer = fix code, Operational = user-friendly messages, System = log + monitor.
