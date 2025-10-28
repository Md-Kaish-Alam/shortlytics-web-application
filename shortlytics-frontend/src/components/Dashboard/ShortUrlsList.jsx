import ShortenUrl from "./ShortenUrl";

const ShortUrlsList = ({ data }) => {
  return (
    <div className="my-6 space-y-4">
      {data.map((url) => (
        <ShortenUrl key={url.id} {...url} />
      ))}
    </div>
  );
};

export default ShortUrlsList;
