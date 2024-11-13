import { CustomFramework } from '../../../framework/CustomFramework';


import { HeaderInput } from './HeaderInput';
export function Header({setItems}){
    return (
        <header className="header">
            <h1>TODO</h1>
            <HeaderInput setItems={setItems} />
        </header>
    )
}