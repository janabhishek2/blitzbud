export function searchManagers(inp, managers) {
  if (inp == "") return managers;
  const newMgrs = managers.filter((mgr) => {
    return mgr.email.slice(0, inp.length).toLowerCase() == inp.toLowerCase();
  });
  return newMgrs;
}
