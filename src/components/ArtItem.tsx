import classes from './ArtItem.module.css'

const ArtItem: React.FC<{title: string, progress: number, onCancelPrompt: () => void}> = (props) => {
    return (
    <li className={classes.artItem}>
        {props.title} Progress: {props.progress}           
        <button onClick={props.onCancelPrompt}>Cancel</button>
    </li>
    )
}
export default ArtItem