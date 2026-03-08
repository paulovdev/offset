export const LABS_QUERY = `
*[_type == "lab"] | order(number asc){
  _id,
  number,
  title,
  mark,
  year,
  meta,
  statement,
  action,

  heroMedia{
  image{
    asset->{
      url,
      metadata { lqip }
    }
  }
},
  sections[]{
  ...,
    image{
      asset->{
        url,
        metadata { lqip }
      }
    }
  }
}
`;

export const ABOUT_QUERY = `
*[_type == "about"][0]{
  sections[]{
    ...,

    approachs[]{
      ...,
      image{
        asset->{
          url,
          metadata { lqip }
        }
      }
    },

    teams[]{
      ...,
      image{
        asset->{
          url,
          metadata { lqip }
        }
      }
    },

    image{
      asset->{
        url,
        metadata { lqip }
      }
    }

  }
}
`;
