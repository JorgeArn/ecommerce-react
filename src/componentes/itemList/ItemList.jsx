import { Item } from "../item/Item";
import styles from "./ItemList.module.css";

export function ItemList({ productos }) {
    return (
        <div className={styles.grid}>
            {productos.map(prod => (
                <Item key={prod.id} {...prod} />
            ))}
        </div>
    );
}