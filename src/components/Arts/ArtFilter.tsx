import "./ArtFilter.css";

function ArtFilter(props: {isFavourites: boolean, onChangeFilter: ((isFavourites: boolean) => void)}) {

  const markAsFavouriteHandler = (event: any) => {
    props.onChangeFilter(event.target.value)
  }

  return (
    <div className="art-filter">
      <div className="art-filter__control">
        <label>Favourites</label>
        <select value={props.isFavourites.toString()} onChange={markAsFavouriteHandler}>
          <option value="true">yes</option>
          <option value="false">no</option>
        </select>
      </div>
    </div>
  );
}

export default ArtFilter;
