export default defineEventHandler(async event => {
  console.log("Submitted review!");
  console.log(event);
  return { ok: true, error: null };
});
