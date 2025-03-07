import { TextBox } from "@/ui/atoms/Inputs/TextBox/TextBox";
import { TextField } from "@/ui/atoms/Inputs/TextField/TextField";
import { Stack } from "@/ui/layouts/Stack/Stack";
import React, {useEffect, useState} from "react";
import { Image, Play, Video } from "lucide-react";
import { NewPost } from "@/types/Post";


interface PostGalereFormProps {
  handleFormRef: CallableFunction;
  handleSubmit: CallableFunction;
}

export default function PostGalereForm(props: PostGalereFormProps) {
  const { handleFormRef, handleSubmit } = props;
  const formRef = React.useRef(null);
  const [imgUrl, setImgUrl]= React.useState("");
  const [pst, setPst] = React.useState({});

  const onSubmit = (formdata: FormData) => {
    if (!formRef.current) return;

    const post: NewPost = {
      ...pst,
      imageUrl: imgUrl,
    };

    console.log(post);
    handleSubmit(post);
  };

  React.useEffect(() => {
    if (formRef.current) {
      handleFormRef(formRef.current);
    }
  }, [formRef]);

  return (
    <form className="space-y-4" ref={formRef} action={onSubmit}>
      <Stack direction="col">
        <Stack direction="col">
          <Stack direction="col">
            <TextField label="Titre" type={"text"} name={"title"} onChange={(e) => {
              setPst(prev =>  ({...prev, title: e.target.value}));
            }}/>
          </Stack>

          <Stack direction="col">
            <label>
              Problème
              <TextBox name={"problem"}  onChange={(e) => {
              setPst(prev =>  ({...prev, problem: e.target.value}));
            }}/>
            </label>
          </Stack>

          <Stack direction="col">
            <label>
              Solution
              <TextBox name={"solution"} onChange={(e) => {
              setPst(prev =>  ({...prev, solution: e.target.value}));
            }}/>
            </label>
          </Stack>

          <Stack direction="col">
            <label>
              Conseil
              <TextBox name={"advice"} onChange={(e) => {
              setPst(prev =>  ({...prev, advice: e.target.value}));
            }}/>
            </label>
          </Stack>

          <Stack direction="col">
            <label>
              Leçon
              <TextBox name={"lesson"} onChange={(e) => {
              setPst(prev =>  ({...prev, lesson: e.target.value}));
            }}/>
            </label>
          </Stack>
        </Stack>
      </Stack>

      <MediaUploader handleGif={(gif: any) => {
        console.log(gif);

        if(gif && gif.url) {
          setImgUrl(gif.url);
        }
      }}/>
    </form>
  );
}


// Composant principal pour l'upload de médias
const MediaUploader = (props: {handleGif: CallableFunction}) => {
  const [showGifModal, setShowGifModal] = useState(false);
  const [gifs, setGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Fonction pour gérer l'upload d'image
  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setSelectedMedia({
            type: "image",
            url: event.target.result,
          });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // Fonction pour gérer l'upload de vidéo
  const handleVideoUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setSelectedMedia({
            type: "video",
            url: event.target.result,
          });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // Fonction pour ouvrir la modal des GIFs
  const openGifModal = () => {
    setShowGifModal(true);
    fetchTrendingGifs();
  };

  // Fonction pour récupérer les GIFs tendance
  const fetchTrendingGifs = async () => {
    try {
      setIsLoading(true);
      // Remplacez API_KEY par votre clé d'API Tenor
      const response = await fetch(
        `https://g.tenor.com/v1/trending?key=LIVDSRZULELA&limit=20`
      );
      const data = await response.json();
      setGifs(data.results);
      setIsLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des GIFs:", error);
      setIsLoading(false);
    }
  };

  // Fonction pour rechercher des GIFs
  const searchGifs = async () => {
    if (!searchTerm.trim()) {
      fetchTrendingGifs();
      return;
    }

    try {
      setIsLoading(true);
      // Remplacez API_KEY par votre clé d'API Tenor
      const response = await fetch(
        `https://g.tenor.com/v1/search?q=${searchTerm}&key=LIVDSRZULELA&limit=20`
      );
      const data = await response.json();
      setGifs(data.results);
      setIsLoading(false);
    } catch (error) {
      console.error("Erreur lors de la recherche de GIFs:", error);
      setIsLoading(false);
    }
  };

  // Fonction pour gérer la sélection d'un GIF
  const handleGifSelect = (gif:any) => {
    setSelectedMedia({
      type: "gif",
      url: gif.media[0].gif.url,
    });
    setShowGifModal(false);
  };

  useEffect(() => {
    props.handleGif(selectedMedia);
  }, [selectedMedia])

  // Effet pour déclencher la recherche lors de la modification du terme de recherche
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (showGifModal) {
        searchGifs();
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  return (
    <div className="p-4">
      {/* Barre d'outils de médias */}
      <div className="flex items-center space-x-4 bg-gray-100 p-2 rounded-md">
        {/* <button
          onClick={handleImageUpload}
          className="p-2 hover:bg-gray-200 rounded-md transition-colors"
          title="Ajouter une image"
        >
          <div className="w-6 h-6 relative">
            <Image size={24} />
            <span className="absolute -top-1 -right-1 text-xs font-bold">
              +
            </span>
          </div>
        </button> */}

        <button
          onClick={openGifModal}
          className="p-2 hover:bg-gray-200 rounded-md transition-colors"
          title="Ajouter un GIF"
        >
          <div className="w-6 h-6 relative">
            <Image size={24} />
            <Play size={12} className="absolute -bottom-1 -right-1" />
          </div>
        </button>

        {/* <button
          onClick={handleVideoUpload}
          className="p-2 hover:bg-gray-200 rounded-md transition-colors"
          title="Ajouter une vidéo"
        >
          <Video size={24} />
        </button> */}
      </div>

      {/* Affichage du média sélectionné */}
      {selectedMedia && (
        <div className="mt-4 border rounded-md p-2">
          <h3 className="text-sm font-medium mb-2">Média sélectionné :</h3>
          <div className="relative">
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              onClick={() => setSelectedMedia(null)}
            >
              ×
            </button>
            {selectedMedia.type === "video" ? (
              <video
                src={selectedMedia.url}
                controls
                className="max-w-full h-auto"
              />
            ) : (
              <img
                src={selectedMedia.url}
                alt="Media"
                className="max-w-full h-auto"
              />
            )}
          </div>
        </div>
      )}

      {/* Modal pour la sélection de GIFs */}
      {showGifModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-screen overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Sélectionner un GIF</h2>
                <button
                  onClick={() => setShowGifModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher des GIFs..."
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>

            <div className="p-4 max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <span>Chargement...</span>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {gifs.map((gif) => (
                    <div
                      key={gif.id}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleGifSelect(gif)}
                    >
                      <img
                        src={gif.media[0].tinygif.url}
                        alt={gif.content_description}
                        className="w-full h-auto rounded-md"
                      />
                    </div>
                  ))}
                </div>
              )}

              {!isLoading && gifs.length === 0 && (
                <div className="text-center py-10">
                  <p>Aucun GIF trouvé</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
