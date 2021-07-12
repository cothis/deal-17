import { Profile } from './Profile';

const pf = new Profile('Beomi', 'jun@beomi.net');
console.log(pf.hello());

fetch('http://127.0.0.1:8000/test', {}).then((res) => res.json()).then(console.log)