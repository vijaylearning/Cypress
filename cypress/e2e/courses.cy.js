describe('Course Management API', () => {
  const auth = {
    username: "admin",
    password: "admin123"
  };

  it('Create a new course', () => {
    cy.api({
      method: 'POST',
      url: '/api/courses',
      auth,
      body: {
        name: "Intro to Cypress",
        description: "Automation testing with Cypress",
        courseCode: "CYP101",
        credits: 3,
        fee: 2000,
        active: true
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("id");
      cy.wrap(response.body.id).as("courseId");
    });
  });

  it('Get all courses', () => {
    cy.api({
      method: 'GET',
      url: '/api/courses',
      auth
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });

  it('Update a course', function () {
    cy.api({
      method: 'PUT',
      url: `/api/courses/${this.courseId}`,
      auth,
      body: {
        name: "Cypress Automation Advanced",
        description: "Deep dive into Cypress",
        courseCode: "CYP201",
        credits: 4,
        fee: 3000,
        active: true
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq("Cypress Automation Advanced");
    });
  });

  it('Delete a course', function () {
    cy.api({
      method: 'DELETE',
      url: `/api/courses/${this.courseId}`,
      auth
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
});