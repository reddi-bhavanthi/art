import { createApi } from "unsplash-js";
const pictures = document.querySelector("#pictures");

const unsplash = createApi({
  accessKey: "M6_93WS_6J6tMrzF6Ga4L-i9IJEIpSEBHfgf5E1RyB0",
});

unsplash.search
  .getPhotos({
    query: "Classic Art",
    page: 1,
    perPage: 10,
    orientation: "portrait",
  })
  .then((result) => {
    if (result.type === "success") {
      const photos = result.response.results;
      console.log(photos);
    }
  });
