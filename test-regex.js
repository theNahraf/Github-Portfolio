const tests = [
  "![alt](https://example.com/img.jpg)",
  "![alt](https://example.com/img.jpg =300)",
  "![alt](https://example.com/img.jpg =)", // invalid
];

const regex = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+=(\d+))?\)/g;

tests.forEach(t => {
  console.log("---");
  console.log(t);
  let match;
  while ((match = regex.exec(t)) !== null) {
    console.log("alt:", match[1]);
    console.log("url:", match[2]);
    console.log("width:", match[3]);
  }
});
