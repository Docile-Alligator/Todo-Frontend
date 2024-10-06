import cookie from 'cookie';


export default (req) => {
    const cookies = req.cookies;

    return {
        'Cookie': `${cookie.serialize('todox-session', cookies.get('todox-session').value)}`
    }
}