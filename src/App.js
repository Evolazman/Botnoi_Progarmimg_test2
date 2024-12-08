import { useEffect, useState } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function App() {
    const customStyle = {
        fontFamily: 'Impact, sans-serif', // เปลี่ยนฟ้อนตามที่คุณต้องการ
        fontSize: '17px',
        

    };

    const custom = {
        fontSize: '10px',
        color: 'red'
    };
    const image = {
        width: '200px', // ปรับความกว้างของรูปภาพ
        height: 'auto', // ทำให้ความสูงของรูปภาพปรับตามอัตราส่วนของความกว้าง
        display: "flex", 
        justifyContent: "center",

    };
    const imagecard = {

        width: '100%', // ปรับความกว้างของรูปภาพ
        height: '100%', // ทำให้ความสูงของรูปภาพปรับตามอัตราส่วนของความกว้าง
        padding: "10px 20px",
        display: "flex", justifyContent: "center"
        
        // top: '55%', // ตั้งค่าให้รูปอยู่ตรงกลางตามแกนตั้ง
        // left: '50%', // ตั้งค่าให้รูปอยู่ตรงกลางตามแกนนอน
        // transform: 'translate(-50%, -50%)', // ใช้
    };

    const [name, setName] = useState('');

    const [poke, setPoke] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoding] = useState(false);
    const [number, setNumber] = useState(1);
    const [val, setVal] = useState(1);
    const [pik, setPik] = useState("");
    const [type1, setType1] = useState("");
    const [type2, setType2] = useState("");
    const [stats, setStats] = useState([]);


    useEffect(() => {
        let abortController = new AbortController();
        const loadPoke = async () => {

            try {

                setLoding(true);
                let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/` + number, {
                    signal: abortController.signal
                });
                setPik("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/" + number + ".png")
                setName(res.data?.name.toUpperCase())
                setType1(res.data?.types[0]?.type?.name.toUpperCase())
                setType2(res.data?.types[1]?.type?.name.toUpperCase())
                
                const stats = res.data?.stats.map((stat) => ({
                  name: stat.stat.name.toUpperCase(), 
                  baseStat: stat.base_stat,          
                  }));
                
                setStats(stats)
                setError('');
                


            } catch (error) {
                setError('WRONG', error);
            
            } finally {
                setLoding(false);
            }
        }
        loadPoke();
        return () => abortController.abort();
    }, [number])



    console.log(poke);

    const prePoke = () => {
        if (number > 0) {
            setNumber(number - 1)
        }
    }
    const nextPoke = () => {
        setNumber(number + 1)
    }

    const randomNumber = () => {
        const genrandomNumber = Math.floor(Math.random() * 1000) + 1;
        setNumber(genrandomNumber)
    }

    const handleInputChange = (event) => {
        setVal(event.target.value);
      };
    
      const set = () => {
        setNumber(val)
      }
    

    const box_btn = {
        width: '100%', // ปรับความกว้างของรูปภาพ
        // backgroundColor : "red",
        display: "flex", 
        justifyContent: "space-between"
    }

    return (

        <>
            <Container>
            <div className="card" style={imagecard} >
                <body className="card" >
                    <div>
                        <h2 style={{textAlign : "center"}}>ID : {number}</h2>
                        <img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" style={image} alt={name} />
                        <h1 style={{textAlign : 'center'}} className="mt-3">{name}</h1>
                        <img style={image} src={pik} alt={name} />
                        <Row style={{margin : "0 0 20px 0"}}>
                          <Col style={{fontWeight : "500"}}>Type 1 : {type1}</Col>
                          <Col style={{fontWeight : "500"}}>Type 2 : {type2}</Col>
                          <Col style={{fontWeight : "500"}}>Base Status :</Col>
                          {stats.map((stat, index) => (
                            <Col key={index}>
                            {stat.name} = {stat.baseStat}
                            </Col>
                            ))}
                        </Row>
                        <div style={box_btn}>
                            <button  onClick={prePoke} style={customStyle} className="btn btn-secon"><i className="fa fa-angle-double-left" />previous
                            </button>
                            <button onClick={randomNumber} style={customStyle} className="btn btn-secon">
                            Random
                          </button>
                            <button onClick={nextPoke} style={customStyle} className="btn btn-secon">next
                                <i className="fa fa-angle-double-right" />
                            </button>
                        </div>
                        

                        <div>
                            <h5>Select with number</h5>
                        </div>
                        
                        <input onChange={handleInputChange} id='val' type="number" class="form-control" className="text-center" placeholder="Number"></input>
                        <button onClick={set} className="btn btn-secon">Submit</button>
                    </div>
                </body>
            </div>
            </Container>
        </>
    )
}

export default App;