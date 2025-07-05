let counter = 1;

export default function replaceClick(
  event: React.MouseEvent<HTMLButtonElement>
) {
  console.log(`To be replaced (${counter})`, event);
  counter += 1
}
