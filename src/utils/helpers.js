export const compareDesc = (a, b) => {
  if (a.voteScore < b.voteScore)
    return 1;
  if (a.voteScore > b.voteScore)
    return -1;
  return 0;
}

export const compareAsc = (a, b) => {
  if (a.voteScore < b.voteScore)
    return -1;
  if (a.voteScore > b.voteScore)
    return 1;
  return 0;
}

export const dateAsc = (a, b) => {
  if (a.timestamp < b.timestamp)
    return -1;
  if (a.timestamp > b.timestamp)
    return 1;
  return 0;
}

export const dateDesc = (a, b) => {
  if (a.timestamp < b.timestamp)
    return 1;
  if (a.timestamp > b.timestamp)
    return -1;
  return 0;
}

export const sortFunction = (flag) => {
  if (flag === 'vote-desc') return compareDesc;
  else if (flag === 'vote-asc') return compareAsc;
  else if (flag === 'date-desc') return dateDesc;
  else return dateAsc;
}

export const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString();
}