import { CustomFramework } from '../../../framework/CustomFramework';


import { Input } from './Input';
export function Header({setItems}){
    return (
        <header className="header">
            <h1>TODO</h1>
            <Input setItems={setItems} />
        </header>
    )
}