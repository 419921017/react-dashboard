/* eslint-disable no-await-in-loop */
export default async function runAnimation($el: any, animations: any[] = []) {
  const play = (animation: any) => {
    return new Promise((resolve) => {
      $el.classList.add(animation.value, 'animated')
      const removeAnimation = () => {
        $el.removeEventListener('animationend', removeAnimation)
        $el.removeEventListener('animationcancel', removeAnimation)
        $el.classList.remove(animation.value, 'animated')
        resolve($el)
      }

      $el.addEventListener('animationend', removeAnimation)
      $el.addEventListener('animationcancel', removeAnimation)
    })
  }

  for (let i = 0, len = animations.length; i < len; i++) {
    await play(animations[i])
  }
}
