document.getElementById('resumeForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const summary = document.getElementById('summary').value;
  const skills = document.getElementById('skills').value;

  const photo = document.getElementById('photo').files[0];
  const reader = new FileReader();

  reader.onloadend = function() {
      const photoData = reader.result;

      let education = '';
      const educationInputs = document.querySelectorAll('#educationDetails input');
      educationInputs.forEach(input => {
          education += `<p>${input.value}</p>`;
      });

      let projects = '';
      const projectInputs = document.querySelectorAll('#projectDetails input');
      for (let i = 0; i < projectInputs.length; i += 2) {
          projects += `<p><strong>${projectInputs[i].value}:</strong> ${projectInputs[i + 1].value}</p>`;
      }

      const resume = `
          <h2>${name}</h2>
          <img src="${photoData}" alt="Uploaded Photo" style="max-width: 200px; max-height: 200px;">
          <p>Email: ${email}</p>
          <p>Phone: ${phone}</p>
          <p>Address: ${address}</p>
          <h3>Summary</h3>
          <p>${summary}</p>
          <h3>Education Details</h3>
          ${education}
          <h3>Skill Set</h3>
          <p>${skills}</p>
          <h3>Project Details</h3>
          ${projects}
      `;

      const newWindow = window.open();
      newWindow.document.write(resume);
      
      const downloadButton = '<a id="downloadButton" href="data:text/html,' + encodeURIComponent(resume) + '" download="resume.html">Download</a>';
      newWindow.document.write(downloadButton);
  };

  if (photo) {
      reader.readAsDataURL(photo);
  } else {
      reader.onloadend();
  }
});
