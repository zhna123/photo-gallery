const { exec } = require('child_process');

function runCommand(command) {
  exec(command, (error) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      process.exit(1);
    }
  });
}

function main() {
  if (process.argv.length < 3) {
    console.log("Usage: node sync_to_aws.js <bucket_name>");
    process.exit(1);
  }

  const s3bucketname = process.argv[2];
  console.log(`s3bucketname: ${s3bucketname}`);

  // Sync directories with AWS
  console.log("Syncing with AWS...");
  runCommand(`aws s3 cp out/404.html s3://${s3bucketname}/404.html`);
  runCommand(`aws s3 cp out/favicon.ico s3://${s3bucketname}/favicon.ico`);
  runCommand(`aws s3 cp out/index.html s3://${s3bucketname}/index.html`);
  runCommand(`aws s3 cp out/index.txt s3://${s3bucketname}/index.txt`);
  runCommand(`aws s3 cp out/logo.svg s3://${s3bucketname}/logo.svg`);
  runCommand(`aws s3 cp out/photos.csv s3://${s3bucketname}/photos.csv`);
  runCommand(`aws s3 sync --follow-symlinks out/_next s3://${s3bucketname}/_next`);
  runCommand(`aws s3 sync --follow-symlinks out/images s3://${s3bucketname}/images`);
  runCommand(`aws s3 sync --follow-symlinks out/thumbnail s3://${s3bucketname}/thumbnail`);
}

if (require.main === module) {
  main();
}
