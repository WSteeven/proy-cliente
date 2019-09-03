export class Comment {
    constructor(
        // tslint:disable-next-line: variable-name
        public _id: string,
        public text: string,
        public file: string,
        // tslint:disable-next-line: variable-name
        public created_at: string,
        public user: string,
        public publication: string
    ) { }
}

/*
publication: {type: Schema.ObjectId, ref: 'Publication'},
    user: {type: Schema.ObjectId, ref: 'User'},
    text: String,
    file: String,
    created_at: String,
*/