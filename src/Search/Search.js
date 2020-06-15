import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import styles from './Search.module.css';

function Search(props) {

    const [search, setSeach] = useState(false);
    const [filteredItems, setFilteredItems] = useState([]);
    const [index, setIndex] = useState(0);
    const [searchText, setSearchText] = useState('');

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
            props.search(res);
        })
        .catch(err =>{
            console.log(err);
        });
    }, []);

    useEffect(() => {
        setFilteredItems([...props.users]);
    }, []);

    console.log(props.users);
    let items;

    if(props.users.length > 0) {
        items = filteredItems.map((i, idx) => {
            return <div key={i.id} className={index === idx ? styles.users : styles.users__before}>
                <p style={{fontWeight: 'bold', textTransform: 'uppercase'}}>{i.id}</p>
                <p>{i.name}</p>
                <p style={{fontSize: '14px'}}>{i.address}</p>
            </div>
        });
    }

    const handleKeyDown = (e) => {       
        if (e.keyCode === 38 && index > 0) {
            setIndex(prevState => prevState - 1);
        } else if (e.keyCode === 40 && index < filteredItems.length - 1) {
            setIndex(prevState => prevState + 1);
        }
    }

    const onChangeHandler = (event) => {
        const input = event.target.value;
        setSeach(true);
        setFilteredItems([...props.users]);
        setSearchText(...searchText, input);
        setFilteredItems(props.users.filter(i => {
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
                    {search && <div className={styles.search__container} >
                        {filteredItems.length > 0 ? items : items = <div className={styles.no__users}>
                            <p>No User Found</p>
                        </div>} 
                    </div>}
                </div>
            </div>      
        </div>
    )
};

const mapStateToProps = state => {
    return {
        users: state.users,
        filteredItems: state.filteredItems
    }
};

const mapDispatchToProps = dispatch => {
    return {
        search: (users) => dispatch({type: 'search', users: users})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
