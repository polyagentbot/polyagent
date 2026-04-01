const { exec } = require("child_process");

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Usage:");
  console.log("  node index.cjs balance");
  console.log("  node index.cjs portfolio");
  console.log("  node index.cjs trade ETH");
  process.exit(0);
}

const commandMap = {
  balance: "check wallet balance",
  portfolio: "show my portfolio",
  trade: (arg) => `analyze ${arg} and suggest a trade`
};

let input;

if (commandMap[args[0]]) {
  if (typeof commandMap[args[0]] === "function") {
    input = commandMap[args[0]](args[1] || "");
  } else {
    input = commandMap[args[0]];
  }
} else {
  input = args.join(" ");
}

const cmd = `bankr run "${input}"`;

exec(cmd, (error, stdout, stderr) => {
  if (error) {
    console.error("Error:", error.message);
    return;
  }
  if (stderr) {
    console.error(stderr);
  }
  console.log(stdout);
});
