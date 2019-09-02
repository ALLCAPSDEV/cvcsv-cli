const globby = (a:string, {}) => {
  if(a === './') {
    return ['test/1.jpg', 'files/2.png']
  }
  return [`${a}/testing/1.jpg`, `${a}/anotherDir/2.png`];
}

export default globby;