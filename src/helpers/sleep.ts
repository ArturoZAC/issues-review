export const sleep = ( milliseconds: number = 1500) => {
  return new Promise( (response ) => {
    setTimeout( () => {
      response(true)
    }, milliseconds);
  })
};