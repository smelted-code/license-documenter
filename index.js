const nlf = require("nlf");
const pathIndex = process.argv.indexOf("-p") + 1;

if (!pathIndex) {
  // TODO: extract error message to constants
  console.error(`You must provide a path with the parameter -p, e.g.
license-documenter -p ~/my/great/project`);
  process.exit(1);
}

const path = process.argv[pathIndex];
console.log(path);
// LATER: make this do-able without a parameter
// TODO: Add prettier
// TODO: add dependency flag

// TODO: Refactor
(async () => {
  const licenseData = await new Promise((resolve, reject) =>
    nlf.find(
      {
        directory: path //todo: rename
      },
      (err, data) => (err ? reject(err) : resolve(data))
    )
  );
  const summary = licenseData.reduce((acc, curr) => {
    acc[curr.name] = {
      licenses: curr.licenseSources.package.sources
    };
    return acc;
  });
  console.log(JSON.stringify(summary, null, "  "));
})();

// BSD, GPL, Public Domain, LGPL, MIT, Apache, MPL, WTFPL, ISC, Eclipse Public License
