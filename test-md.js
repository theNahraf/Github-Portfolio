const html = "![test.jpg](https://res.cloudinary.com/demo/image/upload/v1/test.jpg)";
const escaped = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const img = escaped.replace(
  /!\[([^\]]*)\]\(([^)]+)\)/g,
  '<figure class="my-6"><img src="$2" alt="$1" /><figcaption>$1</figcaption></figure>'
);
console.log(img);
