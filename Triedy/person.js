class Person{

    #dob 
       constructor(name, surname, dob){ 
            this.name = name;
            this.surname = surname;
            this.#dob = dob;
       }
    
        #infoPrivate(){
        let year = this.#dob.getFullYear();
        let month = ("0" + (this.#dob.getMonth() + 1)).slice(-2);
        let day = ("0" + this.#dob.getDate()).slice(-2);
    
            return(this.name+' '+this.surname+' '+
                (day+'.'+month+'.'+year));
        }
    
        infoPublic(){
            let privateInfo = this.#infoPrivate();
            const result = privateInfo.split(' ');
            
            console.log(result[0]+' '+result[1]);
            //return this.#infoPrivate().split(' ').slice(0,2).join(" ")
        }
    
        nested() {
          let printThis=() => console.log(this);  
          printThis();
        }
        
    }
    
    
    
    
     /*
       info(){
            console.log(this.name + " " 
            + this.surname + " " 
            + this.dateOfBirth.getDate() + "." 
            + (this.dateOfBirth.getMonth()+1) + "." 
            + this.dateOfBirth.getFullYear())
        }
       */