package com.azerfon.billing.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.azerfon.billing.domain.Billinguser;

import com.azerfon.billing.repository.BillinguserRepository;
import com.azerfon.billing.web.rest.util.HeaderUtil;
import com.azerfon.billing.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;
import java.util.List;
import java.util.Optional;

import static org.reflections.util.ConfigurationBuilder.build;

/**
 * REST controller for managing Billinguser.
 */
@RestController
@RequestMapping("/api")
public class BillinguserResource {

    private final Logger log = LoggerFactory.getLogger(BillinguserResource.class);

    private static final String ENTITY_NAME = "billinguser";

    private final BillinguserRepository billinguserRepository;

    public BillinguserResource(BillinguserRepository billinguserRepository) {
        this.billinguserRepository = billinguserRepository;
    }

    /**
     * POST  /billingusers : Create a new billinguser.
     *
     * @param billinguser the billinguser to create
     * @return the ResponseEntity with status 201 (Created) and with body the new billinguser, or with status 400 (Bad Request) if the billinguser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/billingusers")
    @Timed
    public ResponseEntity<Billinguser> createBillinguser(@RequestBody Billinguser billinguser) throws URISyntaxException {
        log.debug("REST request to save Billinguser : {}", billinguser);
        if (billinguser.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new billinguser cannot already have an ID")).body(null);
        }
        Billinguser result = billinguserRepository.save(billinguser);
        return ResponseEntity.created(new URI("/api/billingusers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /billingusers : Updates an existing billinguser.
     *
     * @param billinguser the billinguser to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated billinguser,
     * or with status 400 (Bad Request) if the billinguser is not valid,
     * or with status 500 (Internal Server Error) if the billinguser couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/billingusers")
    @Timed
    public ResponseEntity<Billinguser> updateBillinguser(@RequestBody Billinguser billinguser) throws URISyntaxException {
        log.debug("REST request to update Billinguser : {}", billinguser);
        if (billinguser.getId() == null) {
            return createBillinguser(billinguser);
        }
        Billinguser result = billinguserRepository.save(billinguser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, billinguser.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /billingusers/bill : Bills an existing billinguser.
     *
     * @param id the billinguser to bill
     * @return the ResponseEntity with status 200 (OK) and with body the updated billinguser,
     * or with status 400 (Bad Request) if the billinguser is not valid,
     * or with status 500 (Internal Server Error) if the billinguser couldn't be billed
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/billingusers/bill/{id}")
    @Timed
    public ResponseEntity<Billinguser> billBillinguser(@PathVariable Long id) throws URISyntaxException {
        /*log.debug("REST request to delete Billinguser : {}", id);
        billinguserRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();




        log.debug("REST request to get Billinguser : {}", id);
        Billinguser billinguser = billinguserRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(billinguser));*/

        log.debug("REST request to bill Billinguser : {}", id);
        Billinguser billinguser = billinguserRepository.findOne(id);
        billinguser.setBalance(billinguser.getBalance() - 10);
        billinguser.setBilldate(billinguser.getBilldate().plus(30, ChronoUnit.MONTHS));
        Billinguser result = billinguserRepository.save(billinguser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, billinguser.getId().toString()))
            .body(result);
    }

    /**
     * GET  /billingusers : get all the billingusers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of billingusers in body
     */
    @GetMapping("/billingusers")
    @Timed
    public ResponseEntity<List<Billinguser>> getAllBillingusers(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Billingusers");
        Page<Billinguser> page = billinguserRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/billingusers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /billingusers/:id : get the "id" billinguser.
     *
     * @param id the id of the billinguser to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the billinguser, or with status 404 (Not Found)
     */
    @GetMapping("/billingusers/{id}")
    @Timed
    public ResponseEntity<Billinguser> getBillinguser(@PathVariable Long id) {
        log.debug("REST request to get Billinguser : {}", id);
        Billinguser billinguser = billinguserRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(billinguser));
    }

    /**
     * DELETE  /billingusers/:id : delete the "id" billinguser.
     *
     * @param id the id of the billinguser to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/billingusers/{id}")
    @Timed
    public ResponseEntity<Void> deleteBillinguser(@PathVariable Long id) {
        log.debug("REST request to delete Billinguser : {}", id);
        billinguserRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
