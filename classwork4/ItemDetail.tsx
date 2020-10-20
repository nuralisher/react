import React, { ReactElement } from 'react'
import { useRouteMatch } from 'react-router-dom'
import useDataFetching from './useDataFetching';

interface Props {
    
}

export default function ItemDetail({}: Props): ReactElement {

    const match = useRouteMatch<{id: string}>();

    const { loading, results, error } = useDataFetching({
        dataSource: `http://census.daybreakgames.com/get/ps2/item?item_id=${match.params.id}&c:show=description.en,item_id,name.en,image_path`,
      });
    
      
    
    if (loading || error) {
        return loading ? "Loading..." : error.message;
    }

    if (results && results[0]) {
        return (
            <div className="container">
                <h1>{results && results[0].name ? results[0].name.en : 'No name(('}</h1>
                <h3>{results && results[0].description ? results[0].description.en : 'No Description(('}</h3>
                <img src={`http://census.daybreakgames.com${results[0].image_path}`} alt=""/>
            </div>
        )
    }
    
    return <div>Nothing</div>
}
