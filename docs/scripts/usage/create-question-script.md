# Create a Script for a Question
 
Create the script in `src/per-question/`

Add an entrypoint for it `webpack.config.js`

During development, build with:
```
npm run dev
```
For production, build with:
```
npm run build
```
Webpack will then output the script to the `dist/` directory

Copy the JavaScript in the output file to the embedded JavaScript field for
your question in Qualtrics

---

### Resources

- https://webpack.js.org/
- https://babeljs.io/
- https://github.com/babel/babel-loader
