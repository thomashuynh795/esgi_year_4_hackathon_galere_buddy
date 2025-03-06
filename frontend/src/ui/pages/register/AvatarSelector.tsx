export default function AvatarSelector() {
  const avatars = Array.from({ length: 10 }, () => "/img/profilePicture.png");

  return (
    <>
      <h3 className="font-bold mb-2">HOMME</h3>
      <div className="grid grid-cols-5 gap-4">
        {avatars.map((src, index) => (
          <label
            key={`male-${index}`}
            className="cursor-pointer flex flex-col items-center"
          >
            <input
              type="radio"
              name="avatar"
              value={`male-${index}`}
              className="hidden peer"
            />
            <img
              src={src}
              alt={`Avatar Homme ${index + 1}`}
              className="w-16 h-16 rounded-full border-2 border-transparent peer-checked:border-blue-500 transition-all"
            />
          </label>
        ))}
      </div>

      <h3 className="font-bold mt-4 mb-2">FEMME</h3>
      <div className="grid grid-cols-5 gap-4">
        {avatars.map((src, index) => (
          <label
            key={`female-${index}`}
            className="cursor-pointer flex flex-col items-center"
          >
            <input
              type="radio"
              name="avatar"
              value={`female-${index}`}
              className="hidden peer"
            />
            <img
              src={src}
              alt={`Avatar Femme ${index + 1}`}
              className="w-16 h-16 rounded-full border-2 border-transparent peer-checked:border-blue-500 transition-all"
            />
          </label>
        ))}
      </div>
    </>
  );
}
