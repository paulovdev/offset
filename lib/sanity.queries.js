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
  },
  vimeoUrl
},

  sections[]{
    _type,

    // image
    image{
      asset->{
        url,
        metadata{
          lqip,
          dimensions{
            width,
            height
          }
        }
      }
    },
    vimeoUrl,
    overlayText,

    label,
    text,

    // system
    items[]{ label, value }
  }
}
`;
