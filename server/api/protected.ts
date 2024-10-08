export default defineEventHandler(event => {
  console.log(`authenticated request from ${event.context.auth?.decoded.username}`);
});
