const G=q=>"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q+", New Zealand");
const DIR=(a,b)=>"https://www.google.com/maps/dir/?api=1&origin="+encodeURIComponent(a+", New Zealand")+"&destination="+encodeURIComponent(b+", New Zealand")+"&travelmode=driving";
const AB=id=>"https://www.airbnb.com/rooms/"+id;
const STOPS=[
{id:"akl",name:"Auckland",ll:[-36.85,174.76],dates:"13–16 Nov",stay:"Friend's place",st:"ok"},
{id:"rot",name:"Rotorua",ll:[-38.14,176.25],dates:"16–18 Nov",stay:"Gateway to Adventure · Confirmed",st:"ok"},
{id:"wlg",name:"Wellington / Porirua",ll:[-41.13,174.84],dates:"18–19 Nov",stay:"Willowglenn Cottage · Confirmed",st:"ok"},
{id:"pic",name:"Picton",ll:[-41.29,174.01],dates:"19 & 25 Nov",stay:"Ferry terminal",st:"ok"},
{id:"kai",name:"Kaikōura",ll:[-42.40,173.68],dates:"19–20 Nov",stay:"Coastal getaway · Confirmed",st:"ok"},
{id:"tek",name:"Pleasant Point / Tekapo",ll:[-44.26,171.13],dates:"20–21 Nov",stay:"Studio · Confirmed",st:"ok"},
{id:"zqn",name:"Jacks Point / Queenstown",ll:[-45.07,168.73],dates:"21–24 Nov",stay:"Remarkable Stay2 · Confirmed",st:"ok"},
{id:"chc",name:"Christchurch",ll:[-43.53,172.64],dates:"24–25 Nov",stay:"Valley Escape · Confirmed",st:"ok"},
{id:"wlg2",name:"Wellington",ll:[-41.29,174.78],dates:"25–26 Nov",stay:"To book",st:"warn"},
{id:"tpo",name:"Taupō",ll:[-38.69,176.07],dates:"26–27 Nov",stay:"To book",st:"warn"},
{id:"akl2",name:"Auckland",ll:[-36.85,174.76],dates:"27–29 Nov",stay:"To book (near Shahriar)",st:"warn"}];
const ROUTE=[["akl","rot"],["rot","wlg"],["wlg","pic",1],["pic","kai"],["kai","tek"],["tek","zqn"],["zqn","chc"],["chc","pic"],["pic","wlg2",1],["wlg2","tpo"],["tpo","akl2"]];
const CS="Check site";
const ACT={
sky:{t:"Sky Tower & SkyWalk",d:"Auckland's 328 m tower with a lookout; SkyWalk is an optional guided walk around the outside ledge. Atif needs consent.",h:CS,p:CS,u:"Allow 1–2 h (estimate)",k:"Lookout fine for all; check SkyWalk age/height rules on site",w:"https://skycityauckland.co.nz/sky-tower/",m:"Sky Tower Auckland"},
luge:{t:"Skyline Rotorua gondola & luge",d:"Gondola up Mt Ngongotahā, then luge tracks back down.",h:CS,p:CS,u:"Allow 2–3 h (estimate)",k:"Luge OK for Mahnisa (110 cm). Swoop NOT OK (115 cm min)",w:"https://rotorua.skyline.co.nz/",m:"Skyline Rotorua"},
kjet:{t:"KJet Rotorua jet boat",d:"Jet boat ride on Lake Rotorua and the Ohau Channel.",h:CS,p:CS,u:"Check site",k:"Jet boat OK for Mahnisa (110 cm)",w:"https://www.kjet.co.nz/",m:"KJet Rotorua"},
tepuia:{t:"Te Puia",d:"Geothermal valley with Pōhutu Geyser and Māori arts and culture.",h:CS,p:CS,u:"Allow 2–3 h (estimate)",k:"Family friendly; stay on paths",w:"https://www.tepuia.com/",m:"Te Puia Rotorua"},
whaka:{t:"Whakarewarewa Living Māori Village",d:"Guided tours of a living village among geothermal pools.",h:CS,p:CS,u:"Check site",k:"Family friendly",w:"https://whakarewarewa.com/",m:"Whakarewarewa Living Maori Village"},
red:{t:"Redwoods Treewalk",d:"Suspended walkways through giant redwoods, also lit at night.",h:CS,p:CS,u:"Allow about 1 h (estimate)",k:"Family friendly",w:"https://redwoods.co.nz/",m:"Redwoods Treewalk Rotorua"},
hydro:{t:"Hydroslides (skip for Mahnisa)",d:"Mahnisa is below the 120 cm minimum for the hydroslides.",h:"—",p:"—",u:"—",k:"NOT OK for Mahnisa (120 cm min)",w:"",m:""},
tepapa:{t:"Te Papa",d:"New Zealand's national museum on the Wellington waterfront.",h:CS,p:CS,u:"Allow 2–3 h (estimate)",k:"Great for kids",w:"https://www.tepapa.govt.nz/",m:"Te Papa Wellington"},
cable:{t:"Wellington Cable Car",d:"Lambton Quay up to Kelburn lookout and the Botanic Garden.",h:CS,p:CS,u:"Allow about 1 h (estimate)",k:"Family friendly",w:"https://www.wellingtoncablecar.co.nz/",m:"Wellington Cable Car"},
whale:{t:"Whale Watch Kaikōura",d:"Boat trips to see sperm whales and other marine life.",h:CS,p:CS,u:"Check site",k:"Check child age rules on site; can be cancelled for sea conditions",w:"https://whalewatch.co.nz/",m:"Whale Watch Kaikoura"},
seal:{t:"Kaikōura coast & seal colony",d:"Seals on the rocks along the coast near the Kaikōura Peninsula; keep 20 m away.",h:"Outdoor",p:CS,u:"Allow about 1 h (estimate)",k:"Watch kids near rocks and seals",w:"https://www.kaikoura.co.nz/",m:"Point Kean seal colony Kaikoura"},
church:{t:"Church of the Good Shepherd",d:"Small stone church on the shore of Lake Tekapo.",h:CS,p:CS,u:"Allow 30–60 min (estimate)",k:"Family friendly; quiet inside",w:"https://www.churchofthegoodshepherd.org.nz/",m:"Church of the Good Shepherd Tekapo"},
springs:{t:"Tekapo Springs",d:"Hot pools by the lake with seasonal activities.",h:CS,p:CS,u:"Allow 2 h (estimate)",k:"Check site for kids' rules",w:"https://tekaposprings.co.nz/",m:"Tekapo Springs"},
zqsky:{t:"Skyline Queenstown gondola & luge",d:"Gondola to Bob's Peak views, with luge tracks at the top.",h:CS,p:CS,u:"Allow 2–3 h (estimate)",k:"Luge OK for Mahnisa (110 cm)",w:"https://queenstown.skyline.co.nz/",m:"Skyline Queenstown"},
shot:{t:"Shotover Jet",d:"Jet boat through the Shotover River canyons.",h:CS,p:CS,u:"Check site",k:"Jet boat OK for Mahnisa (110 cm)",w:"https://www.shotoverjet.com/",m:"Shotover Jet Queenstown"},
arrow:{t:"Arrowtown",d:"Historic gold-mining town with a main street and riverside walks.",h:"Open access",p:"Free to walk",u:"Half day (estimate)",k:"Family friendly",w:"https://www.arrowtown.com/",m:"Arrowtown"},
glen:{t:"Glenorchy drive",d:"Scenic lakeside road from Queenstown to Glenorchy.",h:"Open access",p:"Free",u:"About 45 min each way (estimate)",k:"Family friendly",w:"",m:"Glenorchy"},
gard:{t:"Christchurch Botanic Gardens",d:"City gardens with conservatories, a paddling pool and a playground.",h:"See opening hours on site",p:CS,u:"Allow 1–2 h (estimate)",k:"Playground and paddling pool for kids",w:"https://ccc.govt.nz/parks-and-gardens/christchurch-botanic-gardens",m:"Christchurch Botanic Gardens"},
ant:{t:"International Antarctic Centre",d:"Antarctic experience near the airport, with storm room and penguins.",h:CS,p:CS,u:"Allow 2–3 h (estimate)",k:"Check site for height limits on rides",w:"https://www.iceberg.co.nz/",m:"International Antarctic Centre"},
huka:{t:"Huka Falls",d:"Powerful falls on the Waikato River just north of Taupō.",h:"Open access",p:"Free to view",u:"Allow 30–60 min (estimate)",k:"Family friendly; hold hands near the edge",w:"https://www.lovetaupo.com/",m:"Huka Falls"},
crat:{t:"Craters of the Moon",d:"Geothermal walk among steaming craters.",h:CS,p:CS,u:"Allow about 1 h (estimate)",k:"Stay on boardwalks",w:"https://www.cratersofthemoon.co.nz/",m:"Craters of the Moon Taupo"}};
const DAYS=[
{d:["2026-11-13"],l:"Fri 13 Nov",p:"Melbourne → Auckland",ev:[["7:10pm","Flight NZ126 MEL → AKL (lands 12:50am Sat)","flight"]],a:[]},
{d:["2026-11-14","2026-11-15"],l:"Sat 14 – Sun 15 Nov",p:"Auckland",ev:[["All day","Rest at a friend's place"],["15 Nov","Optional Sky Tower SkyWalk (to confirm)"]],a:["sky"]},
{d:["2026-11-16","2026-11-17"],l:"Mon 16 – Tue 17 Nov",p:"Rotorua",leg:["Auckland","Rotorua",230,"3h"],ev:[["Morning","Drive Auckland → Rotorua"],["Check-in","Gateway to Adventure","stay"]],a:["luge","kjet","tepuia","whaka","red","hydro"]},
{d:["2026-11-18"],l:"Wed 18 Nov",p:"Wellington (Porirua)",leg:["Rotorua","Porirua",460,"5.5h"],ev:[["Early","Longest North Island drive"],["Check-in","Willowglenn Cottage","stay"]],a:["tepapa","cable"]},
{d:["2026-11-19"],l:"Thu 19 Nov",p:"Ferry → Kaikōura",leg:["Picton","Kaikoura",155,"2h"],rem:"Be at the Interislander terminal by 7:30am",ev:[["7:30am","Ferry check-in, Wellington","ferry"],["8:30am","Interislander departs to Picton","ferry"],["Afternoon","Drive Picton → Kaikōura"],["Check-in","Coastal getaway","stay"]],a:["seal","whale"]},
{d:["2026-11-20"],l:"Fri 20 Nov",p:"Pleasant Point / Tekapo",leg:["Kaikoura","Pleasant Point",340,"4h"],ev:[["Morning","Drive Kaikōura → Pleasant Point"],["Check-in","Studio","stay"]],a:["church","springs"]},
{d:["2026-11-21","2026-11-22","2026-11-23"],l:"Sat 21 – Mon 23 Nov",p:"Queenstown (3 nights)",leg:["Pleasant Point","Jacks Point",300,"4h"],ev:[["21 Nov","Drive to Jacks Point"],["Check-in","Remarkable Stay2 · ask host about parking","stay"]],a:["zqsky","shot","arrow","glen"]},
{d:["2026-11-24"],l:"Tue 24 Nov",p:"Christchurch",leg:["Jacks Point","Christchurch",480,"6h"],ev:[["Early","Longest drive day"],["Check-in","Valley Escape","stay"]],a:["gard","ant"]},
{d:["2026-11-25"],l:"Wed 25 Nov",p:"Ferry → Wellington",leg:["Christchurch","Picton",335,"4.5h"],rem:"Leave Christchurch by 8am for the 1pm ferry check-in",ev:[["8:00am","Leave Christchurch"],["1:00pm","Ferry check-in, Picton","ferry"],["2:00pm","Interislander departs to Wellington","ferry"],["Night","Wellington stay · To book","todo"]],a:[]},
{d:["2026-11-26"],l:"Thu 26 Nov",p:"Taupō",leg:["Wellington","Taupo",375,"4.5h"],ev:[["Morning","Drive Wellington → Taupō"],["Night","Taupō stay · To book","todo"]],a:["huka","crat"]},
{d:["2026-11-27","2026-11-28"],l:"Fri 27 – Sat 28 Nov",p:"Auckland",leg:["Taupo","Auckland",280,"3.5h"],ev:[["Morning","Drive Taupō → Auckland"],["Night","Auckland Airbnb near Shahriar · To book","todo"]],a:[]},
{d:["2026-11-29"],l:"Sun 29 Nov",p:"Fly home",ev:[["8:55am","Flight NZ121 departs AKL","flight"]],a:[]}];
const BOOK=[
{k:"flight",ic:"✈️",t:"Air NZ flights",s:"Booked",st:"ok",lines:["NZ126 Fri 13 Nov · MEL 7:10pm → AKL 12:50am","NZ121 Sun 29 Nov · AKL 8:55am","23 kg bags · ref in Refs tab"],btn:[["Open booking","https://www.airnewzealand.com.au/manage-bookings"]]},
{k:"ferry",ic:"⛴️",t:"Interislander ferry",s:"Booked · Paid NZ$1,197.60",st:"ok",lines:["Thu 19 Nov · Wellington → Picton · check-in 7:30am, departs 8:30am","Wed 25 Nov · Picton → Wellington · check-in 1pm, departs 2pm","Kaitaki · Refundable Family fare · car rego to confirm"],btn:[["Open booking","https://www.interislander.co.nz/book/manage-your-booking"]]},
{k:"stay",ic:"🏡",t:"Gateway to Adventure, Rotorua",s:"Confirmed",st:"ok",lines:["16–18 Nov · 2 nights"],btn:[["Open booking","https://www.airbnb.com/trips"],["Listing",AB("1409036366336798455")]]},
{k:"stay",ic:"🏡",t:"Willowglenn Cottage, Porirua",s:"Confirmed",st:"ok",lines:["18–19 Nov · 1 night"],btn:[["Open booking","https://www.airbnb.com/trips"],["Listing",AB("35468258")]]},
{k:"stay",ic:"🌊",t:"Coastal getaway, Kaikōura",s:"Confirmed",st:"ok",lines:["19–20 Nov · 1 night"],btn:[["Open booking","https://www.airbnb.com/trips"],["Listing",AB("1765014812173523087")]]},
{k:"stay",ic:"🏔️",t:"Studio, Pleasant Point",s:"Confirmed",st:"ok",lines:["20–21 Nov · 1 night"],btn:[["Open booking","https://www.airbnb.com/trips"],["Listing",AB("804765028922883457")]]},
{k:"stay",ic:"🏔️",t:"Remarkable Stay2, Jacks Point",s:"Confirmed",st:"ok",lines:["21–24 Nov · 3 nights","Free cancellation before 16 Nov · ask host about parking"],btn:[["Open booking","https://www.airbnb.com/trips"],["Listing",AB("1459216523054358133")]]},
{k:"stay",ic:"🏡",t:"Valley Escape, Christchurch",s:"Confirmed",st:"ok",lines:["24–25 Nov · 1 night"],btn:[["Open booking","https://www.airbnb.com/trips"],["Listing",AB("1627968205843879964")]]},
{k:"todo",ic:"🛏️",t:"Wellington stay",s:"To book",st:"warn",lines:["25–26 Nov · 1 night"],btn:[]},
{k:"todo",ic:"🛏️",t:"Taupō stay",s:"To book",st:"warn",lines:["26–27 Nov · 1 night"],btn:[]},
{k:"todo",ic:"🛏️",t:"Auckland Airbnb near Shahriar",s:"To book",st:"warn",lines:["27–29 Nov · 2 nights"],btn:[]}];
const TODO=[["wlg","Book Wellington stay (25 Nov)"],["tpo","Book Taupō stay (26 Nov)"],["akl","Book Auckland Airbnb near Shahriar (27–29 Nov)"],["rego","Get the car rego from the friend"],["park","Confirm parking with the Jacks Point host"],["sky","Decide on the Sky Tower SkyWalk (Atif consent)"]];
