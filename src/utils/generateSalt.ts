export function genrateSalt(): string {
  let randomNumber = "";
  for (let i = 0; i < 20; i++) {
    randomNumber += Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
  }
  return randomNumber;
}
