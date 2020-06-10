import React, { useEffect, useState } from 'react';
import styles from './Search.module.css';

function Search() {

    const [users, setUsers] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [search, setSeach] = useState(false);
    const [index, setIndex] = useState(0);
    const myRef = React.createRef();

    useEffect(() => {
        fetch('http://www.mocky.io/v2/5ba8efb23100007200c2750c', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            setUsers([...res]);
            setFilteredItems([...res]);
        })
        .catch(err =>{
            console.log(err);
        });
    }, []);

    const onHover = () => {
        
    };

    let items;

    if(users.length > 0) {
        items = filteredItems.map((i, idx) => {
            return <div key={i.id} id='divElem' onMouseOver={onHover} className={index === idx ? styles.users : styles.users__before}>
                <p style={{fontWeight: 'bold', textTransform: 'uppercase'}}>{i.id}</p>
                <p style={{fontStyle: 'italian'}}>{i.name}</p>
                <p style={{fontSize: '14px'}}>{i.address}</p>
            </div>
        });
    }

    const handleKeyDown = (e) => {       
        if (e.keyCode === 38 && index > 0) {
            setIndex(prevState => prevState - 1);
            console.log(filteredItems[index - 1]);
            document.getElementById('divElem').scrollIntoView();
        } else if (e.keyCode === 40 && index < filteredItems.length - 1) {
            setIndex(prevState => prevState + 1);
            document.getElementById('divElem').scrollIntoView();
        }
    }

    const onChangeHandler = (event) => {
        const input = event.target.value;
        setSeach(true);
        setFilteredItems(users.filter(i => {
            return (i.name.toLowerCase().includes(input.toLowerCase()) ||
            i.id.toLowerCase().includes(input.toLowerCase()) ||
            i.address.toLowerCase().includes(input.toLowerCase()) ||
            i.pincode.toLowerCase().includes(input.toLowerCase()) ||
            i.name.toLowerCase().includes(input.toLowerCase())
        )}));
    };  

    return (
        <div className={styles.row}>
            <div className={styles.search__holder}>
                <div className={styles.search__bar}>
                    <input 
                        type="text"
                        onKeyDown={handleKeyDown} 
                        onChange={onChangeHandler} 
                        placeholder="Search users by ID, addresss, name..." 
                    />
                    {search && <div className={styles.search__container} ref={myRef}>
                        {filteredItems.length > 0 ? items : items = <div className={styles.no__users}>
                            <p>No User Found</p>
                        </div>} 
                    </div>}
                </div>
            </div>      
        </div>
    )
}

export default Search;
