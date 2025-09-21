describe('Student Management API', () => {
  const auth = {
    username: "admin",
    password: "admin123"
  };

  it('Create a new student', () => {
    cy.api({
      method: 'POST',
      url: '/api/students',
      auth,
      body: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "9876543210",
        active: true
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("id");
      cy.wrap(response.body.id).as("studentId");
    });
  });

  it('Get all students', () => {
    cy.api({
      method: 'GET',
      url: '/api/students',
      auth
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });

  it('Update a student', function () {
    cy.api({
      method: 'PUT',
      url: `/api/students/${this.studentId}`,
      auth,
      body: {
        name: "John Updated",
        email: "john.updated@example.com",
        phone: "9876543210",
        active: true
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq("John Updated");
    });
  });

  it('Delete a student', function () {
    cy.api({
      method: 'DELETE',
      url: `/api/students/${this.studentId}`,
      auth
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
});