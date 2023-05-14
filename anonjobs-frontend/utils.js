export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function getFilters(router, filter, jobFilters={}) {
  const { value, key } = filter;
  let searchFilter = router.query.search || jobFilters.search || null;
  let tagFilter = router.query.tag || jobFilters.tag || null;
  let anonFilter = router.query.isAnon || jobFilters.isAnon || null;
  let remoteFilter = router.query.isRemote || jobFilters.isRemote || null;

  let url = "";
  switch (key) {
    case "search":
      searchFilter = value;
      break;
    case "tag":
      tagFilter = value;
      break;
    case "is_anon":
      anonFilter = value;
      break;
    case "is_remote":
      remoteFilter = value;
      break;
    default:
      break;
  }
  const query = {
    search: searchFilter,
    tag: tagFilter,
    isAnon: anonFilter,
    isRemote: remoteFilter,
  };

  const isAnon = anonFilter === "Yes";
  const isremote = remoteFilter === "Yes";

  if (searchFilter && tagFilter && isAnon && isremote) 
  {
    url = `/jobs/${searchFilter}+${tagFilter}+anon+remote`;
  } 
  else if (searchFilter && tagFilter && isAnon && !isremote) 
  {
    url = `/jobs/${searchFilter}+${tagFilter}+anon`;
  } 
  else if (searchFilter && tagFilter && !isAnon && isremote) 
  {
    url = `/jobs/${searchFilter}+${tagFilter}+remote`;
  } 
  else if (searchFilter && tagFilter && !isAnon && !isremote) 
  {
    url = `/jobs/${searchFilter}+${tagFilter}`;
  } 
  else if (searchFilter && !tagFilter && isAnon && isremote) 
  {
    url = `/jobs/${searchFilter}+anon+remote`;
  } 
  else if (searchFilter && !tagFilter && isAnon && !isremote) 
  {
    url = `/jobs/${searchFilter}+anon`;
  } 
  else if (searchFilter && !tagFilter && !isAnon && isremote) 
  {
    url = `/jobs/${searchFilter}+anon`;
  } 
  else if (searchFilter && !tagFilter && !isAnon && !isremote)
  {
    url = `/jobs/${searchFilter}`;
  } 
  else if (!searchFilter && tagFilter && isAnon && isremote) 
  {
    url = `/jobs/${tagFilter}+anon+remote`;
  } 
  else if (!searchFilter && tagFilter && isAnon && !isremote) 
  {
    url = `/jobs/${tagFilter}+anon`;
  } 
  else if (!searchFilter && tagFilter && !isAnon && isremote) 
  {
    url = `/jobs/${tagFilter}+remote`;
  } 
  else if (!searchFilter && tagFilter && !isAnon && !isremote) 
  {
    url = `/jobs/${tagFilter}`;
  } 
  else if (!searchFilter && !tagFilter && isAnon && isremote) 
  {
    url = `/jobs/anon+remote`;
  } 
  else if (!searchFilter && !tagFilter && isAnon && !isremote) 
  {
    url = `/jobs/anon`;
  } 
  else if (!searchFilter && !tagFilter && !isAnon && isremote) 
  {
    url = `/jobs/remote`;
  } 
  else {
    url = "/";
  }

  return {
    url: url,
    query: query,
  };
}
