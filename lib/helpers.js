
//The rest parameter syntax allows a function to accept an indefinite number of arguments as an array
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}