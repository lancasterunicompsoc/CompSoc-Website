export default defineEventHandler(async review => {
  console.log("Received review!");
  console.log(review);
  return { ok: true };
});
