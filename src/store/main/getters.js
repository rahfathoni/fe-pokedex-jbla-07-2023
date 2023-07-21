export const getPokemonList = (state) => state.pokemonList;

export const getOffset = (state) => state.offset;

export const getLoading = (state) => state.loading;

export const getEndData = (state) => state.endData;

export const getFavPokemonList = (state) => state.favPokemonList;

export const getOptionType = (state) => state.optionType;

// export const getTeamProfile = (state) => {
//   const detail = state.teamDetail;
//   const area = state.teamArea;
//   const lastUpdated = convertDate(detail.lastUpdated);

//   return [
//     { field: "Name", value: detail.name, isLink: false },
//     { field: "Country", value: area.name, isLink: false },
//     { field: "Founded", value: detail.founded, isLink: false },
//     { field: "Address", value: detail.address, isLink: false },
//     { field: "Website", value: detail.website, isLink: true },
//     { field: "Color", value: detail.clubColors, isLink: false },
//     { field: "Stadium", value: detail.venue, isLink: false },
//     { field: "Last Updated", value: lastUpdated, isLink: false },
//   ];
// };

// export const getTeamSquad = (state) => {
//   const coach = state.teamDetail.coach;
//   let squad = state.teamDetail.squad;
//   if (state.teamDetail.coach) {
//     const addCoach = {
//       id: coach.id,
//       name: `${coach.firstName || ""} ${
//         coach.lastName ? coach.lastName : coach.name
//       }`,
//       position: "Coach",
//       dateOfBirth: coach.dateOfBirth,
//       nationality: coach.nationality,
//     };
//     squad.push(addCoach);
//   }
//   if (squad) {
//     squad = squad.map((item, index) => ({
//       no: index + 1,
//       ...item,
//     }));
//   }
//   return squad;
// };

// export const getSquadDetail = (state) => {
//   const detail = state.squadDetail;
//   const lastUpdated = convertDate(detail.lastUpdated);

//   return {
//     name: detail.name,
//     data: [
//       { field: "Birth Date", value: detail.dateOfBirth },
//       { field: "Nationality", value: detail.nationality },
//       { field: "Current Team", value: detail.currentTeam.name },
//       {
//         field: "Contract",
//         value: `${detail.currentTeam.contract.start} to ${detail.currentTeam.contract.until}`,
//       },
//       { field: "Position", value: detail.position },
//       { field: "Shirt Number", value: detail.shirtNumber },
//     ],
//     lastUpdated,
//   };
// };
