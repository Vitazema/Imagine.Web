import "./ArtFilter.css";

function ArtFilter(props: {isFavourites: string, onChangeFilter: ((isFavourites: string) => void)}) {

  const markAsFavouriteHandler = (event: any) => {
    props.onChangeFilter(event.target.value)
  }

  return (
    <div className="art-filter">
      <div className="art-filter__control">
        <select value={props.isFavourites} onChange={markAsFavouriteHandler}>
          <option value="false">all</option>
          <option value="true">favourites</option>
        </select>
      </div>
    </div>
  );
}

export default ArtFilter;
