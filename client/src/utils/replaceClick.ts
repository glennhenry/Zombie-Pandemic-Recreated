let counter = 1;

export default function replaceClick(
  event?: any
) {
  console.log(`To be replaced (${counter})`, event);
  counter += 1
}
