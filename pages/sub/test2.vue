<template>
  <editor-content :editor="editor" />
</template>

<script>

import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble, EditorFloatingMenu } from 'tiptap';
export default {
  components: {
    EditorContent,
    editorProps: {},
    editable: true,
    autoFocus: null,
    extensions: [],
    //content: '',
    topNode: 'doc',
    emptyDocument: {
      type: 'doc',
      content: [{
        type: 'paragraph',
      }],
    },
    useBuiltInExtensions: true,
    disableInputRules: false,
    disablePasteRules: false,
    dropCursor: {},
    parseOptions: {},
    injectCSS: true,
    onInit: () => {},
    onTransaction: () => {},
    onUpdate: () => {},
    onFocus: () => {},
    onBlur: () => {},
    onPaste: () => {},
    onDrop: () => {},
  },
  data() {
    return {
      editor: null,
    }
  },
  mounted() {
    this.editor = new Editor({
      content: '<p>Default Content Here</p>',
    })
  }
}

/*const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kiartichai:94IHyNUlUXII6MFt@cluster0.3vhe9.mongodb.net/test?authSource=admin&replicaSet=atlas-k1km9w-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
const client = new MongoClient(uri);
client.connect();

import { MongoClient } from "mongodb";

export default {
  created() {
      const uri = "mongodb+srv://kiartichai:94IHyNUlUXII6MFt@cluster0.3vhe9.mongodb.net/test?authSource=admin&replicaSet=atlas-k1km9w-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
      const client = new MongoClient(uri);
      client.connect();
      this.movie = client.db('sample_mflix').collection('movies').find();
      console.log(this.movie);
  },
  data: () => ({
    movie: {},
  }),
};

/*import  con  from '../../api/mongoDB.js'

export default({
    created() {
        //mongo.connect();
        con.db('sample_mflix').collection('movies').find({$year:1914}).then( (data) =>
            data.forEach( (name) => {
                this.movie.push(name);
            })
        )
    },
    data: () => ({
        movie:{},
    })
})*/
</script>
