const express = require('express');
const app = express();
const PORT = 3000;
const mysql = require('mysql')
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// define the route
app.get('/',(req, res) => {
    res.render("index.ejs")
    });


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'infomatik',
  password: 'infomatik',
  database: 'infomatik'
})


function insertDatabase(){
    connection.connect()
    connection.query('CREATE TABLE IF NOT EXISTS holzarten (idholz INTEGER PRIMARY KEY,name VARCHAR(64))', (err, rows) => {
        if (err) throw err
      
        console.log("holzarten table added!")
      })

    connection.query('CREATE TABLE IF NOT EXISTS seller (idSeller INTEGER PRIMARY KEY, name VARCHAR(64))', (err, rows) => {
      if (err) throw err
    
      console.log("Costumer table added!")
    })

    connection.query('CREATE TABLE IF NOT EXISTS offers(idOffer INTEGER PRIMARY KEY,idSeller INTEGER,idholz INTEGER,price INTEGER,status INTEGER)', (err, rows) => {
        if (err) throw err
      
        console.log("offers table added!")
      })
    
  
     

}

function insertTest(){
   //muss noch connecten: 
   connection.connect();
    connection.query('INSERT INTO holzarten (name) VALUES ("Eiche"), ("Buche"), ("Esche"), ("Ahorn"), ("Birke"), ("Fichte"), ("Kiefer"), ("Tanne"), ("Lärche"), ("Ulme"), ("Pappel"), ("Erle"), ("Hainbuche"), ("Kastanie"), ("Walnuss"), ("Eberesche"), ("Weide"), ("Platane"), ("Robinie"), ("Linde"), ("Kirsche"), ("Apfelbaum"), ("Birnbaum"), ("Hasel"), ("Pflaumenbaum"), ("Speierling"), ("Holunder"), ("Traubenkirsche"), ("Zeder"), ("Zypresse"), ("Elsbeere"), ("Mispel"), ("Wacholder"), ("Weißdorn"), ("Douglasie"), ("Schwarzerle"), ("Feldahorn"), ("Bergahorn"), ("Spitzahorn"), ("Sanddorn"), ("Zwetschge"), ("Schlehe"), ("Kornelkirsche"), ("Stechpalme"), ("Weißtanne"), ("Scharlach-Eiche"), ("Bergulme"), ("Flatterulme"), ("Mehlbeere"), ("Kriecherl"), ("Wildapfel"), ("Wildbirne"), ("Weißerle"), ("Zitterpappel"), ("Silberpappel"), ("Schwarzpappel"), ("Rotbuche"), ("Sommerlinde"), ("Winterlinde"), ("Bastardakazie"), ("Schwarzkiefer"), ("Seekiefer"), ("Rotfichte"), ("Gemeine Eibe"), ("Sumpfeiche"), ("Traubeneiche"), ("Stieleiche"), ("Hopfenbuche"), ("Bergföhre"), ("Europäische Lärche"), ("Schwarzkirsche"), ("Vogelkirsche"), ("Baumhasel"), ("Weißerle"), ("Schwarznuss"), ("Amberbaum"), ("Esskastanie"), ("Edelkastanie"), ("Walnussbaum"), ("Blauglockenbaum"), ("Purpurerle"), ("Schwarzkirsche"), ("Winterlinde"), ("Sommerlinde"), ("Libanon-Zeder"), ("Weymouthskiefer"), ("Purpur-Erle"), ("Kaiserliche Eiche"), ("Bergkiefer"), ("Koloradotanne"), ("Serbische Fichte"), ("Atlaszeder"), ("Spanische Tanne"), ("Kanadische Hemlocktanne"), ("Nordmannstanne"), ("Europäische Eibe"), ("Sibirische Zirbelkiefer"), ("Europäische Lärche"), ("Japanische Lärche"), ("Hybridlärche")', (err, rows) => {
        if (err) throw err
      
        console.log("Erfolgreich holzarten hinzugefügt!")
      })

      connection.query('INSERT INTO seller (name) VALUES("HolzWelt GmbH"), ("Naturholz AG"), ("ForestPro Ltd."), ("Eurowood Handels GmbH"), ("Bauholz und Co."), ("TimberTech GmbH"), ("HolzHof AG"), ("Waldwerk GmbH"), ("GreenWood Solutions"), ("Holz & Natur GmbH"), ("WoodMasters Ltd."), ("Holzhandel Europa"), ("Wood Experts GmbH"), ("Eichenholz AG"), ("Forst & Holz GmbH"), ("Holz Direkt AG"), ("Timberline Ltd."), ("HolzKontor GmbH"), ("Naturholz Vertrieb GmbH"), ("HolzPartner AG"), ("Wald & Holz GmbH"), ("TimberTrade AG"), ("ForstMeister GmbH"), ("Holzveredler AG"), ("EcoWood Ltd."), ("Holzlieferant24 GmbH"), ("ForestGroup AG"), ("PremiumHolz GmbH"), ("Europäischer Holzhandel"), ("Wald & Co."), ("HolzProfi AG"), ("Grünwald Holzhandel"), ("TimberWorld GmbH"), ("Naturholz Meister"), ("Holz Import AG"), ("Waldreich GmbH"), ("Holz International AG"), ("ForstPro GmbH"), ("Waldwerkstatt GmbH"), ("Holz & Bau AG"), ("Eurowood Ltd."), ("TimberZone GmbH"), ("Holz Experten AG"), ("Holz und Co. GmbH"), ("WaldGrün AG"), ("HolzVertrieb GmbH"), ("Premium Timber GmbH"), ("ForestPlus AG"), ("HolzUnion GmbH"), ("Holzmeister AG")', (err, rows) => {
        if (err) throw err
      
        console.log("Erfolgreich holzarten hinzugefügt!")
      })
   
}

function createoffer(seller, holzart,price,status){
    
  const query = `INSERT INTO offers (idSeller, idholz, price, status) VALUES ?`;

 connection.query(query, [seller, holzart, price, status], (error, results) => {
    if (error) {
      console.log("WAS ES GEHT ;D")
    }
});



}






// Route
app.post("/offer", async (req, res) => {
    const seller = req.body.seller;
    const holz = req.body.holz;
    const price = req.body.price;
    console.log(seller,holz,price)
 createoffer(seller,holz,price,1)
  res.redirect("/");
});


function getHolz(){
    
    connection.query('SELECT * from holzarten', (err, rows) => {
      if (err) throw err
    
      console.log(rows)
    })
 
  }
 
app.listen(PORT,() => {
        console.log(
            `Server is listening at 
            http://localhost:${PORT}`
        );

        insertDatabase();
        getHolz();

      //  insertTest();
    });