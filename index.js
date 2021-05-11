url = 'https://api.airtable.com/v0/'
base_ID = 'appWngR6w3r09OZyP'
table=`Table%20${new Date().getDay()}`
GOT_API_KEY = ""
table_el_id = "table"

async function refresh(){
    chrome.storage.sync.get("API_KEY", async ({ API_KEY }) => {
        GOT_API_KEY = API_KEY;
        schedule = await get_data(API_KEY);
        await set_data(schedule['records']);
    });
};

get_data = async function(API_KEY) {
    console.log(API_KEY)
    res = await fetch (`${url}${base_ID}/${table}?view=Grid%20view&api_key=${API_KEY}`);
    data = await res.json();
    console.log(data)
    return data
} 

set_data = function(schedule) {

    let table = document.querySelector(`#${table_el_id}`);
    
    for(i=0; i<schedule.length; i++){
        row = document.createElement('tr')
        table.appendChild(row)
        console.log(schedule[i]['fields'])
        
        var From = schedule[i]['fields']['From']
        var To = schedule[i]['fields']['To']

        if (
            new Date().getHours() > To.split(":")[0] || (new Date().getHours() == To.split(':')[0] && new Date().getMinutes() > To.split(':')[1])
        ){
            row.classList.add('class-ended')
        }
        else if( 
            (   
                new Date().getHours() < To.split(":")[0] || 
                
                (
                    new Date().getHours() == To.split(':')[0] && 
                    new Date().getMinutes() <= To.split(':')[1]
                )
            
            ) && (

                new Date().getHours() > From.split(":")[0] || 
                (
                    new Date().getHours() == From.split(':')[0] && 
                    new Date().getMinutes() > From.split(':')[1]
                )

            )
        ){

            row.classList.add('class-ongoing')

        }
        
            

        teacher = document.createElement('td');
        teacher.innerHTML = schedule[i]['fields']['Teacher Name'];
        row.appendChild(teacher);

        Subject = document.createElement('td');
        Subject.innerHTML = schedule[i]['fields']['Subject'];
        row.appendChild(Subject);

        join_cell = document.createElement('td');
        row.appendChild(join_cell);

        join_link = document.createElement('a');
        join_link.innerHTML = "Join Class";
        join_link.href = schedule[i]['fields']['Join Link'];
        join_link.target = "_blank"

        join_cell.appendChild(join_link)
        
    }

}

window.onload = refresh;
