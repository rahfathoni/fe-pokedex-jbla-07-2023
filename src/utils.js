// export const convertDate = (value) => {
//   const date = new Date(value);
//   const year = date.getFullYear();
//   let month = date.getMonth() + 1;
//   let day = date.getDate();

//   if (month.toString().length === 1) {
//     month = `0${month}`;
//   }
//   if (day.toString().length === 1) {
//     day = `0${day}`;
//   }

//   return `${day} / ${month} / ${year}`;
// };

export const typeColor = (value) => {
  const colours = {
    normal: {
      bg: '#A8A77A',
      text: 'white'
    },
    fire: {
      bg: '#EE8130',
      text: 'black'
    },
    water: {
      bg: '#6390F0',
      text: 'white'
    },
    electric: {
      bg:'#F7D02C',
      text: 'black'
    },
    grass: { 
      bg:'#7AC74C',
      text: 'black'
    },
    ice: {
      bg: '#96D9D6',
      text: 'black'
    },
    fighting: { 
      bg:'#C22E28',
      text: 'white'
    },
    poison: {
      bg: '#A33EA1',
      text: 'white'
    },
    ground: { 
      bg:'#E2BF65',
      text: 'black'
    },
    flying: {
      bg: '#A98FF3',
      text: 'black'
    },
    psychic: { 
      bg: '#F95587',
      text: 'white'
    },
    bug: { 
      bg: '#A6B91A',
      text: 'white',
    },
    rock: {
      bg: '#B6A136',
      text: 'white'
    },
    ghost: {
      bg: '#735797',
      text: 'white'
    },
    dragon: {
      bg: '#6F35FC',
      text: 'white'
    },
    dark: { 
      bg:'#4c3b30',
      text: 'white'
    },
    steel: { 
      bg:'#B7B7CE',
      text: 'black'
    },
    fairy: {
      bg: '#D685AD',
      text: 'black'
    }
  };
  return colours[value] || { bg: '#FFFFFF', text: 'black' }
}